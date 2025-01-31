import redis from "redis";

  const client = redis.createClient({

        url : process.env.UPSTASH_URI
    })
    
    client.on("error", (err)=>{
      console.error('Redis error:', err);
      throw err;
    })
    
    await client.connect();



export default client;
