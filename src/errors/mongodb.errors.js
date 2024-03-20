const notFoundError = (res) => {
    return res.status(404).send("Tarefa não encontrada no banco de dados");
};

const objectIdCastError = (res) => {
    return res.status(500).send("Ocorreu um erro ao recuperar este dado");
};

module.exports = {
    notFoundError,
    objectIdCastError,
};
