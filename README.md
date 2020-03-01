# restaurants finder by geo location

Node versio : 10  
Web framework : Express  
Database : Mongodb ( geoNear, 2dsphere index )  
Cache : redis ( geoadd, georadius )  
Authentication : JWT  
  
#Testing  
  
docker-compose build test  
docker-compose up test
  
#Run
  
docker-compose build app  
docker-compose up app  
 
