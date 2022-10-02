# ls-redis-nodejs

### reference page
https://kazuhira-r.hatenablog.com/entry/2021/12/29/023347

## sample commands
```
curl -c cookie.txt -b cookie.txt -i localhost:3000/message
```

```
curl -XPOST -c cookie.txt -b cookie.txt -i -H 'Content-Type: application/json' localhost:3000/message -d '{"message": "Hello Express-Session"}'
```
