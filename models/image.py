# models/image.py
from database.set_up import db
import datetime

class Image(db.Document):
    description = db.StringField()
    file_path = db.StringField(required=True)
    uploaded_by = db.ReferenceField('User')
    created_at = db.DateTimeField(default=datetime.datetime.now)
    
    meta = {
        'collection': 'images',
        'indexes': [
            {'fields': ['uploaded_by']},
            {'fields': ['created_at']}
        ]
    }
