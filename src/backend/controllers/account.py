from flask import Blueprint, jsonify, request
from services.userServices import is_unique_email
from services.passwordUtils import hash_password
from data.firebaseSettings import db

# Criação do Blueprint
account_bp = Blueprint('account', __name__)

# Exemplo de rota para criar um usuário


@account_bp.route('/create', methods=['POST'])
def create_user():
    data = request.json
    name = data.get('name'),
    email = data.get('email'),
    password = data.get('password'),
    user_type = data.get('user_type')

    if not all([name, email, password, user_type]):
        return jsonify({"error": 'Inserir todos os dados'}), 400

    user_data = {
        "name": name,
        "email": email,
        "password": password,
        "userType": user_type,
    }

    db.collection('users').add(user_data)
    return jsonify({'message': 'Usuário criado com sucesso'}), 201

# Exemplo de rota para listar usuários


@account_bp.route('/list', methods=['GET'])
def list_users():
    # Lógica para listar usuários
    return jsonify({'users': []}), 200

# Exemplo de rota para atualizar um usuário


@account_bp.route('/update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    # Lógica para atualizar um usuário
    return jsonify({'message': f'Usuário {user_id} atualizado com sucesso'}), 200

# Exemplo de rota para excluir um usuário


@account_bp.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Lógica para excluir um usuário
    return jsonify({'message': f'Usuário {user_id} excluído com sucesso'}), 200
