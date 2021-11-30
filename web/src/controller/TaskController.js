const TaskModel = require('../model/TaskModel');

const now = new Date();

const {
       startOfDay, 
       endOfDay, 
       startOfWeek, 
       endOfWeek, 
       startOfMonth, 
       endOfMonth, 
       startOfYear, 
       endOfYear
        } = require('date-fns');

//A controller faz o tráfego, recebendo e enviando respostas
class TaskController{

    //método reponsável por receber a requisição de armazenamento no banco de dados e criar esse armazenamento
    async create(req, res){
        //recebe a requisição do front
        const task = new TaskModel(req.body);
        //salva no banco de dados
        await task
        .save() 
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

        // save() => método utilizado para salvar os dados que vem do front no banco de dados
        //then() => resposta positiva, caso o salvamento for bem sucedido
        //catch () => tratamento de erro, caso for mal sucedido

    }

    //Método para atualizar
    async update(req, res){

        await TaskModel
        .findByIdAndUpdate({'_id':req.params.id}, req.body, {new: true})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    //Método para leitura de todas as tarefas
    async readAll(req, res){

        await TaskModel
        .find({macadress: {'$in': req.params.macadress}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    //Método para leitura de uma tarefa específica
    async readById(req, res){

        await TaskModel.findById(req.params.id)
        .then(response => {
            if(response)
                return res.status(200).json(response)
            else 
                return res.status(404).json({error : 'Tarefa não encontrada'})
            })
        .catch(error => {return res.status(500).json(error)});

    }

    //Método para deleção de tarefa
    async delete(req, res){

        await TaskModel
        .deleteOne({'_id':req.params.id})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }


    //método responsável por encontrar a tarefa pelo id e atualizar o status de feito ou não feito.
    async done(req, res){

        await TaskModel
        .findByIdAndUpdate({'_id':req.params.id},{'done':req.params.done}, {new: true})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    //método responsável por verificar se a tarefa está atrasada
    //lt = less... than
    async late(req, res){
        await TaskModel
        .find({'when':{'$lt': now}, 'macadress': {'$in': req.params.macadress} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }


    //filtros => hoje 
    async today(req, res){
        await TaskModel
        .find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfDay(now), '$lt': endOfDay(now)}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }

    //filtro => semana
    async week(req, res){
        await TaskModel
        .find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfWeek(now), '$lt': endOfWeek(now)}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }

    //filtro => mÊs
    async month(req, res){
        await TaskModel
        .find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfMonth(now), '$lt': endOfMonth(now)}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }

    //filtro => ano
    async year(req, res){
        await TaskModel
        .find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfYear(now), '$lt': endOfYear(now)}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }





}

module.exports = new TaskController();