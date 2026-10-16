# MVMD — memory (living state)

## Status
- Village Market built locally (2026-10-16): /#/market, product pages, villager pages, reviews, CMS at /admin
  (villagers add/edit/unlist, recommended pin, per-product priority order, products/categories, review hide/delete, photo upload).
- Seed: 6 categories, 26 products, 42 villagers, 108 listings from the client's final list incl. Wardha additions (`db/seed-source.txt`).
- Committed + pushed 08f0ce5 to main (2026-10-16).
- Deployed to SWA `mvmd-site` (rg `mvmd-rg`, centralus, Free): https://agreeable-river-0f331ff10.1.azurestaticapps.net
  Deployed with `swa deploy ./dist --api-location ./api` (no GitHub Actions link yet).
- LIVE (2026-10-16): DB `mvmd` on hragent-db, owned by role `mvmd_app` (owns only mvmd + its public schema). Seeded: 42 villagers.
  DATABASE_URL set as mvmd-site app setting (only copy). hragent-db firewall unchanged — temp rule added by user, removed after setup.
  To run db-setup again: user adds a temp firewall rule for their IP (auto mode blocks Claude from doing it).
- Admin invite (aad, shivacharanmandhapuram@gmail.com, role admin) generated 2026-10-16, expires 2026-10-23.

## Decisions
- 2026-10-16: DB = new database `mvmd` on existing Azure Postgres flexible server `hragent-db` (rg `hragent-rg`, Central US). No extra cost.
- 2026-10-16: Hosting = new Azure Static Web App (free tier), resource group `mvmd-rg`. CMS login = SWA built-in auth, role `admin` by invitation.
- Images stored in Postgres (`images` table), not Blob Storage — keeps it to one Azure resource.
- Product images are emoji tiles until real photos are uploaded via CMS → Products.

## Next
- [ ] User accepts the admin invite and tries the CMS on the live site.
- [ ] Get real product photos (or approve sourcing free-licence ones) and villages for each seller.
- [ ] Optional: link mvmd-site to GitHub for auto-deploy on push; custom domain.

## Session log
- 2026-10-16 — Built Village Market + CMS + Azure Functions API; verified locally (reviews, priority, recommended, add villager, mobile).
- 2026-10-16 — Committed/pushed, created mvmd-rg + mvmd-site, deployed site + API. DB step blocked on firewall approval.
- 2026-10-16 — DB created + seeded, DATABASE_URL set, temp firewall rule removed. Live market verified (milk page, 12 villagers).
