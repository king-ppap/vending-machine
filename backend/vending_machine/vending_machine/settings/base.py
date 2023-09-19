"""
Django settings for vending_machine project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-!g9x$3)7_i5ke=m$*a)9$#%h1&u))^ho6%+2jg0hxgs!6s5)dp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'drf_yasg',
    'rest_framework',
    'rest_framework.authtoken',
    # 'cid.apps.CidAppConfig',
    'machine',
    'stock',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'vending_machine.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'vending_machine.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'vending_machine.pagination.StandardResultsSetPagination',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'TOKEN': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
            'description': 'Token format "Token <your-app-token>"',
        },
    },
}

ADMINS = [('Nut', 'nuthathaina@gmail.com')]
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    # 'filters': {
    #     'correlation': {
    #         '()': 'cid.log.CidContextFilter',
    #     },
    # },
    'formatters': {
        'standard': {
            # 'format': '%(levelname)-8s [%(asctime)s] [%(cid)s] %(name)s: %(message)s'
            'format': '%(levelname)-8s [%(asctime)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        # 'file': {
        #     'class': 'logging.handlers.TimedRotatingFileHandler',
        #     # 'filters': ['correlation'],
        #     'when': 'D',
        #     'interval': 1,
        #     'backupCount': 90,
        #     'filename': 'log/log.log',
        #     'formatter': 'standard',
        # },
        'console': {
            'class': 'logging.StreamHandler',
            # 'filters': ['correlation'],
            'formatter': 'standard',
        },
        'mail_error_admins': {
            'class': 'django.utils.log.AdminEmailHandler',
            # 'filters': ['correlation'],
            'level': 'ERROR',
            'include_html': True,
        },
        'mail_critical_admins': {
            'class': 'django.utils.log.AdminEmailHandler',
            # 'filters': ['correlation'],
            'level': 'CRITICAL',
            'include_html': True,
        },
    },
    'loggers': {
        'django': {
            'handlers': [
                'console',
                # 'file',
                'mail_critical_admins',
            ],
            'level': 'ERROR',
            'propagate': False,
        },
        'survey': {
            'level': os.getenv('DJANGO_LOG_LEVEL', 'ERROR'),
            'handlers': [
                # 'file',
                'console',
                'mail_error_admins',
            ],
            'propagate': True,
        },
        'utils_api': {
            'level': os.getenv('DJANGO_LOG_LEVEL', 'ERROR'),
            'handlers': [
                # 'file',
                'console',
                'mail_error_admins',
            ],
            'propagate': True,
        },
    }
}

ADMIN_LIST_PER_PAGE = 20
ADMIN_LIST_MAX_SHOW_ALL = 100
