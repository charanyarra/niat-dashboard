import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessions, responses, analysisType } = await req.json();

    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let prompt = '';
    
    switch (analysisType) {
      case 'dashboard-summary':
        prompt = `As an AI analytics expert, create a comprehensive dashboard summary for this feedback system:

SESSIONS DATA:
${JSON.stringify(sessions, null, 2)}

RESPONSES DATA:
${JSON.stringify(responses, null, 2)}

Provide a structured JSON response with:
{
  "executiveSummary": "Overall performance summary in 2-3 sentences",
  "keyMetrics": {
    "totalResponses": number,
    "averageRating": number,
    "responseRate": "percentage",
    "satisfactionLevel": "High/Medium/Low"
  },
  "topPerformingSessions": [{"name": "session name", "rating": number, "responses": number}],
  "areasForImprovement": ["specific actionable items"],
  "trends": {
    "locationInsights": "insights about location performance",
    "timeBasedTrends": "patterns over time",
    "engagementLevel": "overall engagement analysis"
  },
  "recommendations": [
    {
      "priority": "High/Medium/Low",
      "action": "specific recommendation",
      "expectedImpact": "what this will achieve"
    }
  ],
  "predictions": {
    "nextWeekForecast": "predicted response volume",
    "riskAreas": "potential issues to watch",
    "opportunities": "growth opportunities"
  }
}`;
        break;

      case 'predictive-analytics':
        prompt = `Analyze this feedback data for predictive insights:

${JSON.stringify({ sessions, responses }, null, 2)}

Provide predictions about:
1. Future response volumes
2. Trending session types
3. Location-based demand patterns
4. Potential quality issues
5. Optimal timing for sessions
6. Resource allocation recommendations

Format as structured insights with confidence levels.`;
        break;

      case 'optimization-recommendations':
        prompt = `Generate AI-powered optimization recommendations:

${JSON.stringify({ sessions, responses }, null, 2)}

Analyze and recommend:
1. Session content improvements
2. Timing optimizations
3. Location-specific adaptations
4. Engagement strategies
5. Follow-up actions
6. Resource allocation

Provide specific, actionable recommendations with priority levels.`;
        break;

      case 'automated-report':
        prompt = `Create an automated executive report:

${JSON.stringify({ sessions, responses }, null, 2)}

Generate a professional report including:
1. Executive Summary
2. Performance Metrics
3. Key Findings
4. Trend Analysis
5. Risk Assessment
6. Strategic Recommendations
7. Next Steps

Format as a comprehensive business report.`;
        break;

      case 'quality-assessment':
        prompt = `Perform a quality assessment of the feedback system:

${JSON.stringify({ sessions, responses }, null, 2)}

Evaluate:
1. Data quality and completeness
2. Response patterns and outliers
3. Feedback reliability indicators
4. System performance metrics
5. User engagement quality
6. Content effectiveness scores

Provide quality scores and improvement areas.`;
        break;

      default:
        prompt = `Analyze this comprehensive feedback data and provide intelligent insights:

${JSON.stringify({ sessions, responses }, null, 2)}

Provide detailed analysis with actionable recommendations.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'You are an advanced AI analytics expert specializing in educational feedback analysis, predictive modeling, and business intelligence. Provide detailed, actionable insights with specific metrics and recommendations.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
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
    console.error('Error in ai-dashboard-summary function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});