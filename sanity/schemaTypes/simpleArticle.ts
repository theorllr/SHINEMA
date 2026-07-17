import {
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

const make = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Titre',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'Adresse',
        type: 'slug',
        options: {
          source: 'title',
        },
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'publishedAt',
        title: 'Date',
        type: 'date',
        initialValue: () => new Date().toISOString().slice(0, 10),
      }),
      defineField({
        name: 'excerpt',
        title: 'Résumé',
        type: 'text',
        rows: 3,
      }),
      defineField({
        name: 'mainImage',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'body',
        title: 'Texte',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'block',
          }),
        ],
      }),
    ],
  })

export const news = make('news', 'Actualité')

export const retrospective = make(
  'retrospective',
  'Rétrospective'
)

export const ranking = defineType({
  name: 'ranking',
  title: 'Classement',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Adresse',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'date',
      initialValue: () =>
        new Date().toISOString().slice(0, 10),
    }),

    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'body',
      title: 'Introduction',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),

    defineField({
      name: 'films',
      title: 'Films du classement',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'object',
          name: 'rankingFilm',
          title: 'Film',

          fields: [
            defineField({
              name: 'title',
              title: 'Titre du film',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'originalTitle',
              title: 'Titre original',
              type: 'string',
            }),

            defineField({
              name: 'year',
              title: 'Année',
              type: 'number',
            }),

            defineField({
              name: 'director',
              title: 'Réalisation',
              type: 'string',
            }),

            defineField({
              name: 'poster',
              title: 'Affiche',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),

            defineField({
              name: 'comment',
              title: 'Commentaire',
              type: 'text',
              rows: 5,
            }),
          ],

          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
              media: 'poster',
            },

            prepare({
              title,
              subtitle,
              media,
            }) {
              return {
                title,
                subtitle: subtitle
                  ? String(subtitle)
                  : undefined,
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
})
