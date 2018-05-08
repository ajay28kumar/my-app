/* eslint camelcase: 0 */
export default ({ uid, type, page, limit_per_page }) => ({
  relative_url: `/searches/${uid}`,
  method: 'get',
  query: {
    type,
    page,
    limit_per_page,
    profile_options: JSON.stringify({
      fieldset: ['basic', 'appearance', 'account', 'location', 'doctrine'],
    }),
    photo_options: JSON.stringify({
      fieldset: ['count', 'photos'],
      profile_photo: true,
      size: ['small', 'semilarge'],
    }),
    result_options: JSON.stringify({ fieldset: ['profileids', 'paginator', 'count'] }),
    derived_text: JSON.stringify({ fieldset: ['income'] }),
    derived_options: JSON.stringify({ fieldset: ['intents'] }),
    days: ['discovery_recent_visitors_two_way', 'discovery_newly_joined_strict_2way', '2-way'].includes(type) ? 30 : '',
    sort: ['2-way'].includes(type) ? 'lastlogindate' : '',
  },
});
