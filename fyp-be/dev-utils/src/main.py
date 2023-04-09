try:
    from setup import create_schemas
    from seeders import seed_med_forms, seed_med_class, seed_medicines, create_roles
except Exception as e:
    print(e)
    pass
"""
Run this file once.
ps: try except is to keep the imports even when formatting
"""
