/*
  # Initial Game Schema Setup

  1. New Tables
    - `characters`
      - Core character attributes and stats
      - Linked to auth.users
    - `items`
      - Game items with stats and properties
    - `character_items`
      - Character inventory/equipment junction table
    - `quests`
      - Available quests and their details
    - `character_quests`
      - Track quest progress for characters
    - `guilds`
      - Player guilds and their properties

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Characters Table
CREATE TABLE characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  class text NOT NULL,
  level integer DEFAULT 1,
  experience integer DEFAULT 0,
  health integer DEFAULT 100,
  max_health integer DEFAULT 100,
  mana integer DEFAULT 100,
  max_mana integer DEFAULT 100,
  strength integer DEFAULT 10,
  dexterity integer DEFAULT 10,
  intelligence integer DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_class CHECK (class IN ('Warrior', 'Archer', 'Mage', 'Priest', 'Assassin', 'Knight', 'Warlock'))
);

-- Items Table
CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  rarity text NOT NULL,
  level integer DEFAULT 1,
  stats jsonb DEFAULT '{}',
  description text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_type CHECK (type IN ('weapon', 'armor', 'consumable', 'special')),
  CONSTRAINT valid_rarity CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary'))
);

-- Character Items (Inventory)
CREATE TABLE character_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters(id) ON DELETE CASCADE,
  item_id uuid REFERENCES items(id),
  quantity integer DEFAULT 1,
  equipped boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Quests Table
CREATE TABLE quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  level integer DEFAULT 1,
  rewards jsonb DEFAULT '{}',
  requirements jsonb DEFAULT '{}',
  steps jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Character Quests Progress
CREATE TABLE character_quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters(id) ON DELETE CASCADE,
  quest_id uuid REFERENCES quests(id),
  progress jsonb DEFAULT '{}',
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Guilds Table
CREATE TABLE guilds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  leader_id uuid REFERENCES characters(id),
  level integer DEFAULT 1,
  experience integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Guild Members
CREATE TABLE guild_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guild_id uuid REFERENCES guilds(id) ON DELETE CASCADE,
  character_id uuid REFERENCES characters(id),
  rank text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  CONSTRAINT valid_rank CHECK (rank IN ('leader', 'officer', 'member'))
);

-- Enable Row Level Security
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own characters"
  ON characters FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own characters"
  ON characters FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own characters"
  ON characters FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Everyone can read items"
  ON items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their character items"
  ON character_items FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM characters
    WHERE characters.id = character_items.character_id
    AND characters.user_id = auth.uid()
  ));

CREATE POLICY "Everyone can read quests"
  ON quests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can track their quest progress"
  ON character_quests FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM characters
    WHERE characters.id = character_quests.character_id
    AND characters.user_id = auth.uid()
  ));