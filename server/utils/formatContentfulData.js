export const formatContentfulEntryList = data =>
  data.items.map(item => formatContentfulEntry(item));

export const formatContentfulEntry = entry =>
  Object.keys(entry.fields).reduce((acc, key) => {
    const formattedData = {
      ...acc,
      content_id: entry.sys.id
    };

    if (typeof entry.fields[key] === 'string') {
      return {
        ...formattedData,
        [key]: entry.fields[key]
      };
    } else {
      return {
        ...formattedData,
        [key]: entry.fields[key].fields.file.url
      };
    }
  }, {});
