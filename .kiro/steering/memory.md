# MVMD — memory (living state)

## Status
- Village Market built locally (2026-10-16): /#/market, product pages, villager pages, reviews, CMS at /admin
  (villagers add/edit/unlist, recommended pin, per-product priority order, products/categories, review hide/delete, photo upload).
- Seed: 6 categories, 26 products, 42 villagers, 108 listings from the client's final list incl. Wardha additions (`db/seed-source.txt`).
- Not yet committed / deployed.

## Decisions
- 2026-10-16: DB = new database `mvmd` on existing Azure Postgres flexible server `hragent-db` (rg `hragent-rg`, Central US). No extra cost.
- 2026-10-16: Hosting = new Azure Static Web App (free tier), resource group `mvmd-rg`. CMS login = SWA built-in auth, role `admin` by invitation.
- Images stored in Postgres (`images` table), not Blob Storage — keeps it to one Azure resource.
- Product images are emoji tiles until real photos are uploaded via CMS → Products.

## Next
- [ ] Create SWA + `mvmd` DB, set DATABASE_URL, run scripts/db-setup.mjs, deploy, invite admins.
- [ ] Get real product photos (or approve sourcing free-licence ones) and villages for each seller.
- [ ] Commit + push.

## Session log
- 2026-10-16 — Built Village Market + CMS + Azure Functions API; verified locally (reviews, priority, recommended, add villager, mobile).
