
class BaseService{
    constructor(BaseModel){
        this.BaseModel = BaseModel
    }
    async create(obje){
        return new this.BaseModel(obje).save()
    }
    async findOne(obje){
        return await this.BaseModel.findOne(obje)
    }
    async find(where){
        return await this.BaseModel.find(where)
    }
    async findById(id){
        return await this.BaseModel.findById(id)
    }
    async modify(id,obje){
        return await this.BaseModel.findByIdAndUpdate(id,obje,{new:true})
    }
    async remove(id){
        return await this.BaseModel.findByIdAndDelete(id)
    }    
    async list(page,limit,search){    
        let allList = await this.BaseModel.find(search?{name:{$regex:new RegExp(`.*${search}.*`,'i')}}:{}).sort({ createdAt: -1 })
        if(limit==="all"){return {value:allList}}
        let skip = (parseInt(page)-1)*parseInt(limit)
        let pageLength = allList.length/limit;
        const findedList = await this.BaseModel.find(search?{name:{$regex:new RegExp(`.*${search}.*`,'i')}}:{}).sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
        return {page:Math.ceil(pageLength),value:findedList,total:allList.length}
    }
    
}
module.exports = BaseService