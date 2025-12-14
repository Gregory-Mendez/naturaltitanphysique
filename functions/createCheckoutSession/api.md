# API Information
createCheckoutSession

Function URL
https://api.lumi.new/v1/functions/p380144077566414848/createCheckoutSession

Make a POST request to this endpoint with your function payload.

Headers
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <your-api-key>"
}

Request Body
{
  "planId": "premium_app",
  "userId": "user_123",
  "returnUrl": "https://your-app.lumi.new/abonnement"
}

Usage Example (cURL)
curl -X POST "https://api.lumi.new/v1/functions/p380144077566414848/createCheckoutSession" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-api-key>" \
  -d '{"planId": "premium_app", "userId": "123", "returnUrl": "https://..."}'
