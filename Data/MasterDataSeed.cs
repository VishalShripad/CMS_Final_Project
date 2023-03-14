using CMS.API.Entities;
using System.Text.Json;

namespace CMS.API.Data
{
    public class MasterDataSeed
    {
        public static async Task SeedAsync(CMSAPIContext context)
        {
            try
            {
                if (!context.ChannelGenres.Any())
                {
                    var genreData = File.ReadAllText("./Data/SeedData/ChannelGenre.json");
                    
                    var genres = JsonSerializer.Deserialize<List<ChannelGenre>>(genreData);

                    foreach(var item in genres)
                    {
                        context.ChannelGenres.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ChannelLanguages.Any())
                {
                    var langData = File.ReadAllText("./Data/SeedData/ChannelLanguages.json");

                    var languages = JsonSerializer.Deserialize<List<ChannelLanguage>>(langData);

                    foreach (var item in languages)
                    {
                        context.ChannelLanguages.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Vendors.Any())
                {
                    var vendorData = File.ReadAllText("./Data/SeedData/Vendors.json");

                    var vendor = JsonSerializer.Deserialize<List<Vendors>>(vendorData);

                    foreach (var item in vendor)
                    {
                        context.Vendors.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Channels.Any())
                {
                    var channelData = File.ReadAllText("./Data/SeedData/Channels.json");

                    var channels = JsonSerializer.Deserialize<List<Channel>>(channelData);

                    foreach (var item in channels)
                    {
                        context.Channels.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
