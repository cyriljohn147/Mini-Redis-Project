package store

import (
	"time"
)

var Data = make(map[string]string)
var Hashes = make(map[string]map[string]string)
var TTL = make(map[string]time.Time)

func IsExpired(key string) bool {
	expiry, exists := TTL[key]
	if !exists {
		return false
	}
	if time.Now().After(expiry) {
		delete(Data, key)
		delete(TTL, key)
		return true
	}
	return false
}
