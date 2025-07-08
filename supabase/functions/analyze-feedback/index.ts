import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responses, sessionTitle, analysisType } = await req.json();

    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let prompt = '';
    
    switch (analysisType) {
      case 'summary':
        prompt = `Analyze the following feedback responses for "${sessionTitle}" and provide a comprehensive summary:

${JSON.stringify(responses, null, 2)}

Please provide:
1. Overall sentiment analysis
2. Key themes and patterns
3. Top 3 positive highlights
4. Top 3 areas for improvement
5. Actionable recommendations

Keep the response structured and professional.`;
        break;
        
      case 'sentiment':
        prompt = `Analyze the sentiment of these feedback responses for "${sessionTitle}":

${JSON.stringify(responses, null, 2)}

Provide:
1. Overall sentiment score (1-10)
2. Percentage breakdown (Positive/Neutral/Negative)
3. Most positive feedback highlights
4. Concerns that need attention
5. Sentiment trends by location if applicable`;
        break;
        
      case 'insights':
        prompt = `Extract actionable insights from these feedback responses for "${sessionTitle}":

${JSON.stringify(responses, null, 2)}

Focus on:
1. Learning effectiveness patterns
2. Content delivery insights
3. Participant engagement levels
4. Technical/logistical feedback
5. Specific suggestions for next sessions
6. Location-specific observations`;
        break;
        
      default:
        prompt = `Analyze these feedback responses for "${sessionTitle}" and provide comprehensive insights:

${JSON.stringify(responses, null, 2)}

Provide a detailed analysis including sentiment, key themes, and actionable recommendations.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert feedback analyst specializing in educational workshops and training sessions. Provide detailed, actionable insights based on participant feedback.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }
    
    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-feedback function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});