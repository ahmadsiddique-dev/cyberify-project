let lastRequestTime = 0;

// Ya bahiaya haa tu system chal raha haa
export async function rateLimitThrottler() {
  const minInterval = 6000;
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < minInterval) {
    const delay = minInterval - timeSinceLast;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  lastRequestTime = Date.now();
}

export async function executeWithRetry(fn, validator) {
  let retries = 5;
  let delay = 30000;
  while (retries > 0) {
    try {
      await rateLimitThrottler();
      const result = await fn();
      if (validator(result)) {
        return result;
      }
    } catch (err) {
      console.log(`Request failed: ${err.message} so wait guyyss`);
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    retries--;
    delay *= 2;
  }
  throw new Error("Failed after multiple retries");
}
