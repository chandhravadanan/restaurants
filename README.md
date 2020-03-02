# restaurants finder by geo location

Node version : 10  
Web framework : Express  
Database : Mongodb ( geoNear, 2dsphere index )  
Cache : redis ( geoadd, georadius )  
Authentication : JWT  
  
#Testing  
  
docker-compose -f docker-test.yml up
  
#Run
  
docker-compose app  



 
