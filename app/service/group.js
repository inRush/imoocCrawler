module.exports = app =>{
    class Group extends app.Service{
        async getAll(){
            let  groups = await this.ctx.model.group.find();
            return groups;
        }

        async getIndex(index){
            let group = await this.ctx.model.group.find({index:index});
            return group;
        }
        async getCount(){
            let count = await this.ctx.model.group.count();
            return count;
        }
    }
    return Group;
}