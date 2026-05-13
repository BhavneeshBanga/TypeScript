// Function returning a promise
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async data has been fetched!");
    }, 9000);// it wait for 9 seconds
  });
}

// Async function using await to handle the promise
async function fetchDataAsync(): Promise<void> {
  try {
    const result = await fetchData();
    console.log(result); // Output: Async data has been fetched!
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function
fetchDataAsync();