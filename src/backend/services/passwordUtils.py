from argon2 import PasswordHasher

ph = PasswordHasher()


def hash_password(password):
    if not isinstance(password, str):
        raise ValueError("Password must be a string.")
    return ph.hash(password)


def checkPassword(password, passHash):
    try:
        ph.verify(passHash, password)
        return True
    except:
        return False
