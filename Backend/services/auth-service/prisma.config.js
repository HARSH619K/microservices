require("dotenv/config");
const { defineConfig } = require("prisma/config");

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:admin123@127.0.0.1:5432/authdb",
  },
});
