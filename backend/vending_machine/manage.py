#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


DEV_STATE = 'development'
PRODUCTION_STATE = 'production'

def main():
    state = os.environ.get('STATE', DEV_STATE)

    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'vending_machine.settings.{state}')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
