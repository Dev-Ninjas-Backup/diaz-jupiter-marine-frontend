// Test script to check which parameters boats.com API supports
const API_URL = 'https://api.boats.com/inventory/search';
const API_KEY = 'YawGVsdoOdbfivrATkE4DM1XIGOEn1';

// Testing ALL parameters (existing + new)
const testParams = [
  // Currently in route.ts:
  { name: 'status', value: 'Active' },
  { name: 'salesstatus', value: 'active' },
  { name: 'sort', value: 'price|asc' },
  { name: 'make', value: 'Yamaha' },
  { name: 'model', value: '242' },
  { name: 'year', value: '2020:2024' },
  { name: 'condition', value: 'used' },
  { name: 'class', value: 'Power' },
  { name: 'state', value: 'FL' },
  { name: 'country', value: 'US' },
  { name: 'price', value: '10000:50000|USD' },
  { name: 'length', value: '5:10|meter' },
  { name: 'fuel', value: 'Gas' },
  { name: 'hull', value: 'Fiberglass' },
  { name: 'engines', value: '2' },
  { name: 'AdvancedKeywordSearch', value: 'fishing' },
  
  // New/Unknown parameters:
  { name: 'cabins', value: '2' },
  { name: 'heads', value: '2' },
  { name: 'beam', value: '2:5|meter' },
  { name: 'draft', value: '1:3|meter' },
  { name: 'sleeps', value: '4' },
  { name: 'city', value: 'Miami' },
  { name: 'zip', value: '33101' },
  { name: 'propulsion', value: 'Inboard' },
  { name: 'type', value: 'Power' },
];

async function testParameter(paramName, paramValue) {
  const url = `${API_URL}?key=${API_KEY}&rows=2&${paramName}=${encodeURIComponent(paramValue)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok && data.numResults !== undefined) {
      console.log(`\n✅ ${paramName.padEnd(25)} SUPPORTED (${data.numResults} results)`);
      
      // Show sample data if results exist
      if (data.results && data.results.length > 0) {
        const boat = data.results[0];
        console.log(`   Sample: ${boat.ModelYear || 'N/A'} ${boat.MakeString || 'N/A'} ${boat.Model || 'N/A'}`);
        console.log(`   Price: ${boat.Price || 'N/A'} | Location: ${boat.BoatLocation?.BoatCityName || 'N/A'}, ${boat.BoatLocation?.BoatStateCode || 'N/A'}`);
      }
      
      return true;
    } else {
      console.log(`\n❌ ${paramName.padEnd(25)} NOT SUPPORTED`);
      return false;
    }
  } catch (error) {
    console.log(`\n❌ ${paramName.padEnd(25)} ERROR: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('Testing boats.com API parameters...\n');
  console.log('='.repeat(60));
  
  const supported = [];
  const notSupported = [];
  
  for (const param of testParams) {
    const result = await testParameter(param.name, param.value);
    if (result) {
      supported.push(param.name);
    } else {
      notSupported.push(param.name);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('='.repeat(60));
  console.log(`\n✅ SUPPORTED (${supported.length}): ${supported.join(', ')}`);
  console.log(`\n❌ NOT SUPPORTED (${notSupported.length}): ${notSupported.join(', ')}`);
  console.log('\nTest completed!');
}

runTests();
