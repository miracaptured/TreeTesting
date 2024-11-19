from contextlib import contextmanager
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from dataaccess.config import DBNAME, DBPASSWORD, DBUSER, HOST, PORT

main_engine = sa.create_engine(
    f'postgresql://{DBUSER}:{DBPASSWORD}@{HOST}:{PORT}/{DBNAME}',
    echo=False,
)

DBSession = sessionmaker(main_engine)


@contextmanager
def session_scope():
    """Provides a transactional scope around a series of operations."""
    try:
        session = DBSession()
        yield session
        session.flush()
        session.expunge_all()
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()

