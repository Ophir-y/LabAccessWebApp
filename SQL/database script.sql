-- People scripts:#############################################################################
-- create person

-- INSERT INTO people()
--     VALUES(
--         123456789, -- door_groups
--         'Ophir', -- first_name
--         'Yoram', -- last_name
--         1, -- admin_system_access
--         '159951' -- admin_password / not neccecery if admin_system_access=0 
--     );
INSERT INTO
  people()
VALUES(
    145654123,
    'Michael',
    'Jordan',
    1,
    '159951'
  ),
  (
    204554753,
    'Lionel',
    'Messi',
    1,
    '123456'
  ),
  (
    305474889,		
    'Deigo',
    'Maradona',
    0,
	''
  );
-- update person


-- delete person
DELETE FROM people where person_id = ...
  
  
  
  -- people_groups scripts:#############################################################################
  -- create people_groups
  -- INSERT INTO people_groups()
  --     VALUES(
  --         321, -- person_group_id
  --         123456789, -- person_id
  --         'lab1a people group', -- person_group_name
  --     );
INSERT INTO
  people_groups()
VALUES(
    321,
    123456789,
    'lab1a people group'
  );
-- update people_groups
  -- delete people_groups
DELETE FROM people_groups where people_group_id = ...  
  
  

  -- doors scripts:#############################################################################
  -- create doors
  -- INSERT INTO doors()
  --     VALUES(
  --         12, -- door_id
  --         'lab1a door', -- door_name
  --         'Ulman', -- building_name
  --         1 -- floor_number
  --     );
INSERT INTO
  doors()
VALUES
(
12,
'lab1a door',
'Ulman',
1
),
(11,
'lab1b door',
'Ulman',
1
);
-- update doors
-- delete doors
DELETE FROM doors where door_id = ...  
  -- door_groups scripts:#############################################################################
  -- create door_groups
  -- INSERT INTO door_groups()
  --     VALUES(
  --         112, -- door_group_id
  --         12, -- door_id
  --         'lab1a door group'-- door_group_name
  --     );
INSERT INTO
  door_groups()
VALUES(112, 12, 'lab1a door group');
-- update door_groups
-- delete door_groups
DELETE FROM door_groups where door_group_id = ...  




  -- permissions scripts:#############################################################################
  -- create permissions
  -- INSERT INTO permissions()
  --     VALUES(
  --         21, -- permissions_id
  --         'Door Access', -- permission_type
  -- --         \'Door Access\' - grants access to a door.
  -- --          \'Admin Privileges\' - grants admin privilages to a door.
  -- --          \'Admin Add People\' - permitts adding people to the system.
  -- --          \'Admin Add Doors\' - permitts adding doors to the system.
  -- --          \'Admin Add Permissions\' - permitts adding permissions to people for specific doors.
  -- --          \'Admin Add Admin\' - grants permit to add another admin to a door.',
  --         '2021-07-26', -- initial_date
  --         '2021-07-29', -- expiry_date
  --         '05:05:05' -- start_time
  --         '15:05:05' -- end_time
  --     );
INSERT INTO
  permissions_table()
VALUES(
    21,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  );
-- update permissions

-- delete permissions
DELETE FROM permissions_table where permissions_id = ...  
  
  
  
  -- permission_groups scripts:#############################################################################
  -- create permission_groups
  -- INSERT INTO permission_groups()
  --     VALUES(
  --         221, -- door_group_id
  --         21, -- door_id
  --         'lab1a permissions group' -- door_group_name
  --     );
INSERT INTO
  permission_groups()
VALUES(
    221,
    21,
    'lab1a permissions group'
  );
-- update permission_groups

-- delete permission_groups
DELETE FROM permission_groups where permission_group_id = ...
  
  
  
  
  -- peoples_permissions_doors scripts:#############################################################################
  -- create peoples_permissions_doors
  -- INSERT INTO peoples_permissions_doors()
  --     VALUES(
  --             321--  person_group_id
  --           112 --  door_group_id
  --           221 --  permission_group_id
  --           'lab1a permissions group' --  permission_group_name
  --             'lab1a people group'--  person_group_name
  --             'lab1a door group'--  door_group_name
  --     );
INSERT INTO
  peoples_permissions_doors()
VALUES(
    321,
	112,
    221,
    'lab1a permissions group',
    'lab1a people group',
    'lab1a door group'
  );
-- update peoples_permissions_doors

-- delete peoples_permissions_doors
