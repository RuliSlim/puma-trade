from django.apps import AppConfig


class TransactionConfig(AppConfig):
    name = 'TRANSACTION'

    def ready(self):
        import TRANSACTION.signals
