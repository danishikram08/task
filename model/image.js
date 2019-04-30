module.exports = (sequelize, datatype) => {
    const Image = sequelize.define('Image', {
        id: {
            type: datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        filePath: {
            type: datatype.STRING
        }
    })
    Image.associate = (model) => {
        Image.belongsTo(model.User)
    }
    return Image;
}