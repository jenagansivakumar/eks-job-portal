package clients

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

func RateLimiter(client *redis.Client, ctx context.Context, maxRequests int, timeWindow time.Duration, ip string) bool {
	// Construct the key with the IP address
	key := fmt.Sprintf("api_key:%s", ip)

	// Increment the count for the key
	count, err := client.Incr(ctx, key).Result()
	if err != nil {
		log.Println("Error incrementing rate limiter key:", err)
		return false
	}

	// Check if the count exceeds the max allowed requests
	if count > int64(maxRequests) {
		log.Println("Rate limit exceeded for key:", key)
		return false
	}

	// Set expiration for the key if this is the first request
	if count == 1 {
		if err := client.Expire(ctx, key, timeWindow).Err(); err != nil {
			log.Println("Error setting expiration for key:", key, ":", err)
		}
	}

	log.Println("Request allowed for key:", key)
	return true
}
