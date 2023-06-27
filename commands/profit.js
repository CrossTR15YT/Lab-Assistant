const { MessageEmbed } = require('discord.js')

module.exports = {
    data: {
      name: 'profit',
      description: 'Calculate the profit made in a game',
      options: [
        {
          name: 'box_value',
          description: 'The value of the box',
          type: 'NUMBER',
          required: true,
        },
        {
          name: 'box_amount',
          description: 'The amount of boxes',
          type: 'INTEGER',
          required: true,
        },
        {
          name: 'tax_percent',
          description: 'The percentage of sending payment',
          type: 'NUMBER',
          required: true,
        },
        {
          name: 'members',
          description: 'The amount of members to pay',
          type: 'INTEGER',
          required: true,
        },
      ],
    },
    async execute(interaction) {
      const cost = interaction.options.getNumber('box_value');
      const amount = interaction.options.getInteger('box_amount');
      const feePercent = interaction.options.getNumber('tax_percent');
      const members = interaction.options.getInteger('members');
    
      // Calculate profit
      const totalCost = cost * amount;
      const sharePerMember = ((totalCost / members) / 100) * (100 - feePercent)

      const embed = new MessageEmbed()
        .setColor('#6A0505')
        .setTitle('Profit Calculation')
        .setDescription('Each member should receive `' + sharePerMember.toFixed(2) + '` aUEC')
        .addFields(
            { name: 'Box Value', value: `${cost} aUEC`, inline: true },
            { name: 'Number of Boxes', value: amount.toString(), inline: true },
            { name: 'Fee Percent to pay', value: `${feePercent}%`, inline: true },
            { name: 'Number of Members', value: members.toString(), inline: true },
            { name: 'Total Profit', value: `${totalCost.toFixed(2)} aUEC`, inline: true }
        )
        .setAuthor({ name: 'Lab Assistant', iconURL: 'https://cdn.discordapp.com/attachments/1111818198061416479/1123197311422562386/syndicate.png' })

      await interaction.reply({
        embeds: [embed]
      });
    },
  };
  