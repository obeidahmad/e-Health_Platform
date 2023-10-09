from distutils.core import setup

setup(name='Distutils',
      version='1.0',
      description='Python Distribution Utilities',
      author='technical difficulties',
      packages=['distutils', 'distutils.command',
                'urllib3',
                'requests',
                'psycopg2-binary'],
      )
