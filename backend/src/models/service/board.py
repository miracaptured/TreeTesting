import json

class Column:
    name: str
    values: list[str]

    def __init__(self, name, values):
        self.name = name
        self.values = values

class Board:
    columns: list[Column]

    def __init__(self, json_str):
        dynamic = json.loads(json_str)
        self.columns = list(map(lambda col: Column(name=col['name'], values=col['values']), dynamic['columns']))


