#### Object ID

  - An ID that is automatically created, and inserted into each document under the column `_id`.
  - Uses GUID (Global Unique ID) which is a hash that makes the row unique for not only this collection by any collection a distributive system.
  - The GUID uses the UNIX timestamp, random value and a counter starting at a random value the going down from there which are all 12-bytes long
  - Use `getTimestamp` to see the UNIX timestamp of the Object ID
  - The object ID is store using binary data, meaning that they need a hash string which, is provided, when the Object ID is created and is called to get the hash from MongoDB and thus cut the size of an object in half.
  
