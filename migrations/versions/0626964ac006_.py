"""empty message

Revision ID: 0626964ac006
Revises: 
Create Date: 2024-08-10 14:30:18.938716

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0626964ac006'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('films',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('episode_id', sa.Integer(), nullable=False),
    sa.Column('opening_crawl', sa.Text(), nullable=True),
    sa.Column('director', sa.String(length=100), nullable=True),
    sa.Column('producer', sa.String(length=255), nullable=True),
    sa.Column('release_date', sa.Date(), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('edited', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('rotation_period', sa.String(length=50), nullable=True),
    sa.Column('orbital_period', sa.String(length=50), nullable=True),
    sa.Column('diameter', sa.String(length=50), nullable=True),
    sa.Column('climate', sa.String(length=255), nullable=True),
    sa.Column('gravity', sa.String(length=50), nullable=True),
    sa.Column('terrain', sa.String(length=255), nullable=True),
    sa.Column('surface_water', sa.String(length=50), nullable=True),
    sa.Column('population', sa.String(length=50), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('edited', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('starships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('model', sa.String(length=100), nullable=True),
    sa.Column('manufacturer', sa.String(length=255), nullable=True),
    sa.Column('cost_in_credits', sa.String(length=50), nullable=True),
    sa.Column('length', sa.String(length=50), nullable=True),
    sa.Column('max_atmosphering_speed', sa.String(length=50), nullable=True),
    sa.Column('crew', sa.String(length=50), nullable=True),
    sa.Column('passengers', sa.String(length=50), nullable=True),
    sa.Column('cargo_capacity', sa.String(length=50), nullable=True),
    sa.Column('consumables', sa.String(length=50), nullable=True),
    sa.Column('hyperdrive_rating', sa.String(length=50), nullable=True),
    sa.Column('MGLT', sa.String(length=50), nullable=True),
    sa.Column('starship_class', sa.String(length=100), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('edited', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('vehicles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('model', sa.String(length=100), nullable=True),
    sa.Column('manufacturer', sa.String(length=255), nullable=True),
    sa.Column('cost_in_credits', sa.String(length=50), nullable=True),
    sa.Column('length', sa.String(length=50), nullable=True),
    sa.Column('max_atmosphering_speed', sa.String(length=50), nullable=True),
    sa.Column('crew', sa.String(length=50), nullable=True),
    sa.Column('passengers', sa.String(length=50), nullable=True),
    sa.Column('cargo_capacity', sa.String(length=50), nullable=True),
    sa.Column('consumables', sa.String(length=50), nullable=True),
    sa.Column('vehicle_class', sa.String(length=100), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('edited', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('film_planets',
    sa.Column('film_id', sa.Integer(), nullable=False),
    sa.Column('planet_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['film_id'], ['films.id'], ),
    sa.ForeignKeyConstraint(['planet_id'], ['planets.id'], ),
    sa.PrimaryKeyConstraint('film_id', 'planet_id')
    )
    op.create_table('film_starships',
    sa.Column('film_id', sa.Integer(), nullable=False),
    sa.Column('starship_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['film_id'], ['films.id'], ),
    sa.ForeignKeyConstraint(['starship_id'], ['starships.id'], ),
    sa.PrimaryKeyConstraint('film_id', 'starship_id')
    )
    op.create_table('film_vehicles',
    sa.Column('film_id', sa.Integer(), nullable=False),
    sa.Column('vehicle_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['film_id'], ['films.id'], ),
    sa.ForeignKeyConstraint(['vehicle_id'], ['vehicles.id'], ),
    sa.PrimaryKeyConstraint('film_id', 'vehicle_id')
    )
    op.create_table('people',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('mass', sa.Integer(), nullable=True),
    sa.Column('hair_color', sa.String(length=50), nullable=True),
    sa.Column('skin_color', sa.String(length=50), nullable=True),
    sa.Column('eye_color', sa.String(length=50), nullable=True),
    sa.Column('birth_year', sa.String(length=10), nullable=True),
    sa.Column('gender', sa.String(length=20), nullable=True),
    sa.Column('homeworld', sa.Integer(), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('edited', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['homeworld'], ['planets.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('species',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('classification', sa.String(length=100), nullable=True),
    sa.Column('designation', sa.String(length=100), nullable=True),
    sa.Column('average_height', sa.String(length=50), nullable=True),
    sa.Column('skin_colors', sa.String(length=255), nullable=True),
    sa.Column('hair_colors', sa.String(length=255), nullable=True),
    sa.Column('eye_colors', sa.String(length=255), nullable=True),
    sa.Column('average_lifespan', sa.String(length=50), nullable=True),
    sa.Column('homeworld', sa.Integer(), nullable=True),
    sa.Column('language', sa.String(length=100), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('edited', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['homeworld'], ['planets.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('film_people',
    sa.Column('film_id', sa.Integer(), nullable=False),
    sa.Column('person_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['film_id'], ['films.id'], ),
    sa.ForeignKeyConstraint(['person_id'], ['people.id'], ),
    sa.PrimaryKeyConstraint('film_id', 'person_id')
    )
    op.create_table('film_species',
    sa.Column('film_id', sa.Integer(), nullable=False),
    sa.Column('species_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['film_id'], ['films.id'], ),
    sa.ForeignKeyConstraint(['species_id'], ['species.id'], ),
    sa.PrimaryKeyConstraint('film_id', 'species_id')
    )
    op.create_table('people_species',
    sa.Column('person_id', sa.Integer(), nullable=False),
    sa.Column('species_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['person_id'], ['people.id'], ),
    sa.ForeignKeyConstraint(['species_id'], ['species.id'], ),
    sa.PrimaryKeyConstraint('person_id', 'species_id')
    )
    op.create_table('people_starships',
    sa.Column('person_id', sa.Integer(), nullable=False),
    sa.Column('starship_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['person_id'], ['people.id'], ),
    sa.ForeignKeyConstraint(['starship_id'], ['starships.id'], ),
    sa.PrimaryKeyConstraint('person_id', 'starship_id')
    )
    op.create_table('people_vehicles',
    sa.Column('person_id', sa.Integer(), nullable=False),
    sa.Column('vehicle_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['person_id'], ['people.id'], ),
    sa.ForeignKeyConstraint(['vehicle_id'], ['vehicles.id'], ),
    sa.PrimaryKeyConstraint('person_id', 'vehicle_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('people_vehicles')
    op.drop_table('people_starships')
    op.drop_table('people_species')
    op.drop_table('film_species')
    op.drop_table('film_people')
    op.drop_table('species')
    op.drop_table('people')
    op.drop_table('film_vehicles')
    op.drop_table('film_starships')
    op.drop_table('film_planets')
    op.drop_table('vehicles')
    op.drop_table('user')
    op.drop_table('starships')
    op.drop_table('planets')
    op.drop_table('films')
    # ### end Alembic commands ###
