@echo off
curl -X POST http://localhost:3000/purchase ^
  -H "Content-Type: application/json" ^
  -d "{ \"accountId\": 123, \"adult\": 2, \"child\": 1, \"infant\": 1 }"
pause