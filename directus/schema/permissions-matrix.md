# Permissions Matrix (Planned)

| Role | Scope | Create | Read | Update | Delete |
|---|---|---:|---:|---:|---:|
| Administrator | All collections | ✅ | ✅ | ✅ | ✅ |
| Content Manager | Content collections (pages/sections/categories/lessons/pdf/flashcards/questions/calculation/vocabulary/faq/pricing/site settings) | ✅ | ✅ | ✅ | ✅ |
| Translator | `*_translations` collections only | ❌ | ✅ | ✅ | ❌ |
| Student | Published learning content + own profile/progress | ❌ | ✅ | own only | ❌ |
| Public | Published and complete public content only | ❌ | filtered only | ❌ | ❌ |

## Public read filter intent
For all publicly exposed translation collections:
- `is_published = true`
- `is_complete = true`

For base collections with status field:
- `status = published`

## Student row-level access intent
- `student_profiles`: user can read/update where `directus_user_id = $CURRENT_USER`
- `learning_progress`: user can read/create/update where `student_id.directus_user_id = $CURRENT_USER`
