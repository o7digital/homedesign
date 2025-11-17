/**
 * Script pour créer le modèle "Offre" dans DatoCMS
 * Usage: DATOCMS_CMA_TOKEN=xxx tsx scripts/setup-offres-model.ts
 */

import { buildClient } from "@datocms/cma-client-node";

async function setupOffresModel() {
  const token = process.env.DATOCMS_CMA_TOKEN;
  if (!token) {
    throw new Error("DATOCMS_CMA_TOKEN est requis");
  }

  const client = buildClient({ apiToken: token });

  try {
    console.log("🚀 Création du modèle 'Offre' dans DatoCMS...\n");

    // 1. Créer le modèle
    const model = await client.itemTypes.create({
      name: "Offre",
      api_key: "offre",
      collection_appearance: "table",
      hint: "Promotions et offres spéciales pour les cabañas",
    });

    console.log("✅ Modèle créé:", model.api_key);

    // 2. Créer les champs
    const fields = [
      {
        label: "Titre",
        api_key: "titre",
        field_type: "string",
        validators: { required: {} },
        appearance: { editor: "single_line", parameters: {} },
      },
      {
        label: "Slug",
        api_key: "slug",
        field_type: "slug",
        validators: {
          required: {},
          slug_title_field: { title_field_id: "" }, // sera mis à jour après
        },
        appearance: { editor: "slug", parameters: {} },
      },
      {
        label: "Description courte",
        api_key: "description_courte",
        field_type: "string",
        validators: { required: {} },
        appearance: {
          editor: "single_line",
          parameters: { placeholder: "Description brève pour la liste" },
        },
      },
      {
        label: "Description",
        api_key: "description",
        field_type: "text",
        validators: { required: {} },
        appearance: {
          editor: "textarea",
          parameters: { placeholder: "Description complète de l'offre" },
        },
      },
      {
        label: "Image",
        api_key: "image",
        field_type: "file",
        validators: {
          required: {},
          extension: { extensions: ["jpg", "jpeg", "png", "webp"] },
        },
        appearance: { editor: "file", parameters: {} },
      },
      {
        label: "Date de début",
        api_key: "date_debut",
        field_type: "date",
        validators: { required: {} },
        appearance: { editor: "date_picker", parameters: {} },
      },
      {
        label: "Date de fin",
        api_key: "date_fin",
        field_type: "date",
        validators: { required: {} },
        appearance: { editor: "date_picker", parameters: {} },
      },
      {
        label: "Prix",
        api_key: "prix",
        field_type: "float",
        validators: { required: {} },
        appearance: {
          editor: "float",
          parameters: { placeholder: "Prix final de l'offre" },
        },
      },
      {
        label: "Prix original",
        api_key: "prix_original",
        field_type: "float",
        validators: {},
        appearance: {
          editor: "float",
          parameters: { placeholder: "Prix avant réduction (optionnel)" },
        },
      },
      {
        label: "Pourcentage de réduction",
        api_key: "pourcentage_reduction",
        field_type: "integer",
        validators: { integer_range: { min: 0, max: 100 } },
        appearance: {
          editor: "integer",
          parameters: { placeholder: "Ex: 30 pour -30%" },
        },
      },
      {
        label: "Actif",
        api_key: "actif",
        field_type: "boolean",
        validators: { required: {} },
        appearance: { editor: "boolean", parameters: {} },
        default_value: true,
      },
      {
        label: "Mis en avant",
        api_key: "mis_en_avant",
        field_type: "boolean",
        validators: {},
        appearance: { editor: "boolean", parameters: {} },
        default_value: false,
      },
    ];

    let titreFieldId = "";

    for (const fieldData of fields) {
      const field = await client.fields.create(model.id, fieldData as any);
      console.log(`  ✅ Champ créé: ${field.api_key}`);

      if (field.api_key === "titre") {
        titreFieldId = field.id;
      }
    }

    // Mettre à jour le champ slug pour pointer vers le titre
    if (titreFieldId) {
      const slugField = await client.fields.list(model.id).then((fields) =>
        fields.find((f) => f.api_key === "slug")
      );

      if (slugField) {
        await client.fields.update(slugField.id, {
          validators: {
            required: {},
            slug_title_field: { title_field_id: titreFieldId },
          },
        });
        console.log("  ✅ Champ slug configuré avec le titre");
      }
    }

    // Configurer le champ de titre pour le modèle
    await client.itemTypes.update(model.id, {
      title_field: { id: titreFieldId },
    });

    console.log("\n🎉 Modèle 'Offre' créé avec succès!");
    console.log(
      "\n📝 Vous pouvez maintenant ajouter des offres dans DatoCMS Admin"
    );
    console.log("   → https://homedesignmarques.admin.datocms.com\n");
  } catch (error: any) {
    if (error.message?.includes("API_KEY_ALREADY_USED")) {
      console.log(
        "⚠️  Le modèle 'Offre' existe déjà dans DatoCMS. Aucune action nécessaire."
      );
    } else {
      console.error("❌ Erreur:", error);
      throw error;
    }
  }
}

setupOffresModel().catch(console.error);
