/**
 * A blockchain consists of an immutable set of cryptographically linked
 * transactions. Each transaction contains one or more actions.
 *
 * @typedef {Object} Transaction
 * @global
 *
 * @property {String} tx_id
 * Unique transaction identifier.
 *
 * @property {String} block_time
 * Time of transaction.
 *
 * @property {TransactionInput[]} inputs
 * List of specified inputs for a transaction.
 *
 * @property {TransactionOutput[]} outputs
 * List of specified outputs for a transaction.
 */

/**
 * @typedef {Object} TransactionInput
 * @global
 *
 * @property {String} type
 * The type of the input. Possible values are "issue", "spend".
 *
 * @property {String} asset_id
 * The id of the asset being issued or spent.
 *
 * @property {String} asset_alias
 * The alias of the asset being issued or spent (possibly null).
 *
 * @property {Hash} asset_definition
 * The definition of the asset being issued or spent (possibly null).
 *
 * @property {Integer} amount
 * The number of units of the asset being issued or spent.
 *
 * @property {String} spentOutputId
 * The id of the output consumed by this input. ID is nil if this is an issuance input.
 *
 * @property {String} account_id
 * The id of the account transferring the asset (possibly null if the
 * input is an issuance or an unspent output is specified).
 *
 * @property {String} account_alias
 * The alias of the account transferring the asset (possibly null if the
 * input is an issuance or an unspent output is specified).
 *
 * @property {String} issuance_program
 * A program specifying a predicate for issuing an asset (possibly null
 * if input is not an issuance).
 *
 * @property {String} control_program
 * A UTXO control program.
 *
 * @property {String} address
 * The UTXO address.
 */

/**
 * Each new transaction in the blockchain consumes some unspent outputs and
 * creates others. An output is considered unspent when it has not yet been used
 * as an input to a new transaction. All asset units on a blockchain exist in
 * the unspent output set.
 *
 * @typedef {Object} TransactionOutput
 * @global
 *
 * @property {String} id
 * The id of the output.
 *
 * @property {String} type
 * The type of the output. Possible values are "control" and "retire".
 *
 * @property {String} transaction_id
 * Id of the transaction.
 *
 * @property {Number} position
 * The output's position in a transaction's list of outputs.
 *
 * @property {String} asset_id
 * The id of the asset being issued or spent.
 *
 * @property {String} asset_alias
 * The alias of the asset being issued or spent (possibly null).
 *
 * @property {Hash} asset_definition
 * The definition of the asset being issued or spent (possibly null).
 *
 * @property {Integer} amount
 * The number of units of the asset being issued or spent.
 *
 * @property {String} account_id
 * The id of the account transferring the asset (possibly null).
 *
 * @property {String} account_alias
 * The alias of the account transferring the asset (possibly null).
 *
 * @property {String} control_program
 * The control program which must be satisfied to transfer this output.
 */

/**
 * API for interacting with {@link Transaction transactions}.
 *
 * @module TransactionsApi
 */
const transactionsApi = connection => {
  return {
    build: (baseTransaction = null, actions, ttl = 0) => connection.request('/build-transaction', {
      base_transaction: baseTransaction,
      actions,
      ttl
    }),

    sign: (transaction, password) => connection.request('/sign-transaction', {transaction, password}),

    submit: (rawTransaction) => connection.request('/submit-transaction', {raw_transaction: rawTransaction}),

    estimateGas: (transaction) => connection.request('/estimate-transaction-gas', {
      transaction_template: transaction
    }),

    /**
     * List all local transactions.
     *
     * @returns {Promise<Transaction[]>} All local transactions.
     */
    listAll: () => connection.request('/list-transactions', {}),

    /**
     * List local transactions by id.
     *
     * @param {String} id - The transaction id.
     * @returns {Promise<Transaction[]>} The result transactions.
     */
    listById: (id) => connection.request('/list-transactions', {id}),

    /**
     * List all local transactions by account id.
     *
     * @param {String} accountId - Account id.
     * @returns {Promise<Transaction[]>} The result transactions.
     */
    listByAccountId: (accountId) => connection.request('list-transactions', {account_id: accountId})
  }
}

export default transactionsApi
