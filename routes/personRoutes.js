const router = require('express').Router();
const Person = require('../models/Person')

// Criação de dados  
router.post('/', async (req, res) => {

    // req.body
    const {name, salary, approved} = req.body

    if(!name){
        res.status(422).json({error: 'O campo nome é obrigatório'});
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    // create

    try {
        // criando dados   
        // Person com "P" em letra maiscula está se referindo ao objeto dos models e o person com letra minuscula ao que a API está recebendo 
        await Person.create(person); //await serve para aguardar o tempo de resposta do servidor para executar a proxima ação
        res.status(201).json({msg: 'Pessoa inserida no DB com sucesso'});

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// leitura de dados 

router.get('/', async (req, res) => {
    
    try {

        const people = await Person.find()
        res.status(200).json({people})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição
    const id = req.params.id

    try {

        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'User not found'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }

})


// uptade - atualização de dados (PUT, PATCH)

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body
    
    const person = {
        name,
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({_id: id}, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'o usuario nao foi encontrado'})
            return
        }        

        res.status(200).json(person)
    }catch(error) {
        res.status(500).json({error: error})
    }

})

// delte - deletar dados 

router.delete('/:id', async (req, res) => {
    const id = req.params.id   
    
    try {

        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'User not found'})
            return
        }

        const deletedPerson = await Person.deleteMany({_id: id}, person);
        


        res.status(200).json({msg: 'person deleted succesfully'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router;