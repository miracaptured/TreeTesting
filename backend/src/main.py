from api.app import app
from services import analytics_service
import matplotlib.pyplot as plt
import uvicorn

uvicorn.run("api.app:app", host='0.0.0.0', port=8000, log_level="debug")

#analytics_service.get_card_sort_task_info('6cd283ff-f768-4fac-92c9-a95fc70d51fc', 'Раздел 1', 0)
