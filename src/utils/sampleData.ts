export const generateSampleCSVData = () => {
  const indianNames = [
    'Rajesh Kumar',
    'Priya Sharma',
    'Amit Singh',
    'Sneha Patel',
    'Vikash Gupta',
    'Anita Verma',
    'Rohit Jain',
    'Kavita Reddy',
    'Suresh Nair',
    'Meera Iyer'
  ];

  const locations = ['Pune', 'Hyderabad', 'Noida'];
  const workshops = [
    'Speed Math Workshop',
    'Gen AI Workshop', 
    'Personal Branding Workshop',
    'IOT Workshop',
    'LinkedIn Workshop'
  ];

  const csvData = [];
  
  // Add header
  csvData.push('Name,Email,Workshop,Location,Overall Rating,Content Quality,Instructor Rating,Would Recommend,Comments,Submitted At');
  
  // Generate 10 sample responses
  for (let i = 0; i < 10; i++) {
    const name = indianNames[i];
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    const workshop = workshops[Math.floor(Math.random() * workshops.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const overallRating = Math.floor(Math.random() * 2) + 4; // 4-5 rating
    const contentQuality = Math.floor(Math.random() * 2) + 4; // 4-5 rating
    const instructorRating = Math.floor(Math.random() * 2) + 4; // 4-5 rating
    const wouldRecommend = Math.random() > 0.2 ? 'Yes' : 'Maybe';
    const comments = [
      'Excellent workshop with practical insights',
      'Very informative and well-structured content',
      'Great learning experience, would attend again',
      'Instructor was knowledgeable and engaging',
      'Good content but could use more hands-on activities',
      'Valuable session with real-world applications',
      'Well-organized and professionally delivered',
      'Inspiring workshop with actionable takeaways',
      'Comprehensive coverage of the topic',
      'Interactive session with good networking opportunities'
    ][i];
    const submittedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    csvData.push(`"${name}","${email}","${workshop}","${location}",${overallRating},${contentQuality},${instructorRating},"${wouldRecommend}","${comments}","${submittedAt}"`);
  }
  
  return csvData.join('\n');
};

export const downloadSampleCSV = (filename: string = 'sample_feedback_responses.csv') => {
  const csvContent = generateSampleCSVData();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};