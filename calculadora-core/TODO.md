# TODO: Transformar Projeto em Calculadora

## Passos para Implementação

1. **Atualizar UI (home-page.xml)**:
   - Adicionar GridLayout para layout da calculadora.
   - Incluir display (Label) para mostrar o resultado.
   - Adicionar botões para números (0-9), operadores (+, -, *, /, %, ^, √), =, C (limpar).

2. **Atualizar ViewModel (home-view-model.js)**:
   - Adicionar propriedades: displayText, currentValue, operator, previousValue, isNewEntry.
   - Implementar métodos para botões:
     - onNumberPress: Adicionar dígitos ao display.
     - onOperatorPress: Definir operador e armazenar valor atual.
     - onEqualPress: Executar operação e atualizar display.
     - onClearPress: Limpar tudo.
     - onDotPress: Adicionar ponto decimal.
     - onPercentagePress: Calcular porcentagem (valor / 100).
     - onPowerPress: Preparar para potência.
     - onSqrtPress: Calcular raiz quadrada.
   - Lógica para operações aritméticas básicas.
   - Tratamento de erros (divisão por zero, etc.).

3. **Testar a Aplicação**:
   - Executar o app e verificar funcionamento.
   - Ajustar layout se necessário para dispositivos móveis.

## Notas
- Manter código didático com comentários explicativos.
- Usar apenas NativeScript Core, sem bibliotecas adicionais.
- Layout responsivo com GridLayout.
