from database.adatabase import ADatabase

class News(ADatabase):
    def __init__(self):
        super().__init__("news")
