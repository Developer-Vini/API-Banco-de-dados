const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const express = require("express");
const app = express();

app.use(express.json());

app.post('/usuarios', async (request, response) => {

    const { name, email, telefone } = request.body;

    const user = await prisma.user.create({
        
        data: {
            name,
            email,
            telefone     
        }
    })

    response.status(200).send(user);

})

//DELETAR USUARIO

app.delete('/usuarios/deletar/:id', async (request, response) => {

    const id = request.params.id;

    const userDeleted = await prisma.user.delete({
        
        where: { id }
    })

    return response.status(200).send(userDeleted)

})


app.get('/usuarios', async (request, response) => {

    const users = await prisma.user.findMany();

    return response.status(200).send(users)
})

app.get('/buscar/usuarios/:id', async (request, response) => {

    const id = request.params.id

    const users = await prisma.user.findUnique({
        where: { id }
    })

    response.status(200).send(users)
})

app.put('/editar/usuario/:id', async (request, response) => {

    const id = request.params.id;
    const { name, telefone, email } = request.body

    const usuarioAtualizado = await prisma.user.update({
        where: { id },
        data: {
            name,
            telefone,
            email
        }
    })

    return response.status(200).send(usuarioAtualizado)

})


app.listen(3333, () => {
    console.log("Servidor rodando")
});
