from data.firebaseSettings import db


def is_unique_email(email):
    email_exists = db.collection('users').where('email', '==', email).stream()
    if any(email_exists):
        return False
    return True
