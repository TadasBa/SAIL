-- ID validation
-- If a default/sequence exists from before, drop it.
ALTER TABLE "Tool" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "Tool_id_seq";

-- Force DB to generate the value
ALTER TABLE "Tool" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;



-- UPDATED AT validation
-- Fill updatedAt automatically if not provided on insert
ALTER TABLE "Tool" ALTER COLUMN "updatedAt" SET DEFAULT NOW();



-- NAME, DESCRIPTION, COMPANY validation
-- Ensure name, description, and company are not empty or just whitespace
ALTER TABLE "Tool"
  ADD CONSTRAINT tool_name_not_empty    CHECK (length(btrim(name)) > 0),
  ADD CONSTRAINT tool_desc_not_empty    CHECK (length(btrim(description)) > 0),
  ADD CONSTRAINT tool_company_not_empty CHECK (length(btrim(company)) > 0);



-- WEBSITE validation
-- Ensure website follows a basic URL format
ALTER TABLE "Tool"
  ADD CONSTRAINT tool_website_format
  CHECK (
    website ~* '^https?://(([a-z0-9-]+\.)+[a-z]{2,}|localhost)(:\d+)?(/.*)?$'
  );

