// Test script to find which BoatClassCode values work
const API_URL = 'https://api.boats.com/inventory/search';
const API_KEY = 'YawGVsdoOdbfivrATkE4DM1XIGOEn1';

// Comprehensive list of boat class types to test
const classValues = [
  // Power boats
  'Express Cruiser',
  'Center Console',
  'Cruiser',
  'Sportfish',
  'Trawler',
  'Motor Yacht',
  'Sedan',
  'Convertible',
  'Bowrider',
  'Cuddy Cabin',
  'Deck Boat',
  'Pontoon',
  'Walkaround',
  'Pilothouse',
  'Flybridge',
  'Aft Cabin',
  'Bass Boat',
  'Bay Boat',
  'Runabout',
  'Ski and Wakeboard',
  'Jet Boat',
  'Inflatable',
  'RIB',
  'Tender',
  'Downeast',
  'Lobster',
  'Mega Yacht',
  'High Performance',
  'Antique and Classic',
  
  // Sail boats
  'Sloop',
  'Catamaran',
  'Ketch',
  'Cutter',
  'Schooner',
  'Yawl',
  'Trimaran',
  'Cruiser Racer',
  'Racer',
  'Daysailer',
  'Motorsailer',
  
  // Other
  'Houseboat',
  'Commercial',
  'Unspecified',
];

async function testClassParameter(className) {
  const url = `${API_URL}?key=${API_KEY}&rows=2&class=${encodeURIComponent(className)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Testing class="${className}"`);
    console.log(`Total Results: ${data.numResults || 0}`);
    
    if (data.results && data.results.length > 0) {
      const boat = data.results[0];
      console.log(`\n✅ Sample Boat:`);
      console.log(`   ${boat.ModelYear || 'N/A'} ${boat.MakeString || 'N/A'} ${boat.Model || 'N/A'}`);
      console.log(`   Price: ${boat.Price || 'N/A'}`);
      console.log(`   Location: ${boat.BoatLocation?.BoatCityName || 'N/A'}, ${boat.BoatLocation?.BoatStateCode || 'N/A'}`);
      console.log(`   BoatClassCode: ${JSON.stringify(boat.BoatClassCode)}`);
      
      // Show full object for first successful result
      if (data.numResults > 0 && !global.shownFullObject) {
        console.log(`\n📋 Full Boat Object Sample:`);
        console.log(JSON.stringify(boat, null, 2));
        global.shownFullObject = true;
      }
    } else {
      console.log(`❌ No results`);
    }
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function runTests() {
  console.log('Testing boat class parameter values...\n');
  
  const working = [];
  const notWorking = [];
  
  for (const className of classValues) {
    await testClassParameter(className);
    const url = `${API_URL}?key=${API_KEY}&rows=1&class=${encodeURIComponent(className)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.numResults > 0) {
      working.push({ name: className, count: data.numResults });
    } else {
      notWorking.push(className);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('\n✅ WORKING CLASSES:');
  working.forEach(w => console.log(`   ${w.name.padEnd(30)} - ${w.count} results`));
  
  console.log('\n❌ NOT WORKING CLASSES:');
  console.log(`   ${notWorking.join(', ')}`);
  
  console.log('\n📋 Copy this array for FilterListing.tsx:');
  console.log('const boatTypes = [');
  working.forEach(w => console.log(`  '${w.name}',`));
  console.log('];');
  
  console.log('\nTest completed!');
}

runTests();
