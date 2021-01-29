const fs=require('fs')
const crypto=require('crypto')

module.exports=class Repository{
  constructor(filename){
    if(!filename){
      throw new Error('creating a repo needs a filename!')
    }
  //THIS IS CRUCIAL. WE NEED A PLACE TO SAVE THIS STUFF TO
  //AND ASSIGN TO THE CLASS OBJECT
    this.filename=filename;
    try{
  //check to see if a file exists
  //callback based one, and promise based, and then sync version
  //executes syncronously ... wait to see if this exists. this isn't best always
  //for performance cases its best not to use this.
  //WE ARE ONLY USING IT ONCE THOUGH SO ITS OK
      fs.accessSync(this.filename);
    }
    catch(err){
      //CONSTRUCTOR FUNCTION CANNOT BE ASYNC BY NATURE!
      //WRITES JSON FILE--MADE UP OF AN EMPTY ARRAY
      fs.writeFileSync(this.filename, '[]')
    }
  }
  async create(attrs){
    attrs.id=this.randomId()
    const records=await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
    return attrs;
  }
  async getAll(){
    //we prefer to use promises version WEHENVER possible.
     // (we couldn't ebfore because its in constructor not as a method)
         // open the file;  read its content; parse the contents; return the parsed data
    return JSON.parse(await fs.promises.readFile(this.filename, {encoding: 'utf8'}));
  }

  async writeAll(records){
    //DONT FORGET THIS. HERE WE ARE UNPARSING IT BACK INTO A VALID FORMAT FOR JSON FILE WRITING
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }
  randomId(){
    return crypto.randomBytes(4).toString('hex')
  }
  async getOne(id){
    const records=await this.getAll();
    return records.find(record=>record.id===id)
  }
  async delete(id){
    const records=await this.getAll()
    const filteredUsers=records.filter(record=>
  record.id!==id)
  await this.writeAll(filteredUsers);
  }
  async update(id, attrs){
    const records=await this.getAll();
    const record=records.find(record=>record.id===id)
    if(!record){
      throw new Error(`record with id ${id} not found`)
    }
    Object.assign(record, attrs)
    await this.writeAll(records);
  }
  async getOneBy(filters){
    const records=await this.getAll();
    for(let record of records){
      let found=true;
      for(let key in filters){
        //here we are iterating through each key of the object
        //if the record has a key value that matches the filter key the return record;
        if(record[key]!==filters[key]){
          found=false;
        }
      }
      if(found){
        return record;
      }

    }
  }
}
