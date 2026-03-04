<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>Matungulu Girls School - Sitemap</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f0f0f0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
          }
          h1 {
            color: #2c3e50;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background: #3498db;
            color: white;
            padding: 10px;
            text-align: left;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          tr:hover {
            background: #f5f5f5;
          }
          .url {
            color: #2980b9;
          }
          .badge {
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Matungulu Girls School Sitemap</h1>
          <p>Total pages: <strong><xsl:value-of select="count(urlset/url)"/></strong></p>
          
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="urlset/url">
                <tr>
                  <td>
                    <a class="url" href="{loc}">
                      <xsl:value-of select="loc"/>
                    </a>
                  </td>
                  <td><xsl:value-of select="lastmod"/></td>
                  <td>
                    <span class="badge">
                      <xsl:value-of select="changefreq"/>
                    </span>
                  </td>
                  <td><xsl:value-of select="priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ccc; color: #666;">
            <p>Generated: <xsl:value-of select="urlset/url[1]/lastmod"/></p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>